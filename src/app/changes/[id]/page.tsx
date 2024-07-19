import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

type ParamsType = { //типизація для параметра, з якого ми динамічно беремо id сутності, яку відображатимемо
    params: {
        id: string
    }
}


export default async function ChangeTodo({ params }: ParamsType) { //дістаємо params, у ньому знаходиться наш id по якому ми перейшли

    async function changeTodo(formData: FormData) {
        "use server"

        const changedTodo = formData.get("content")?.valueOf()
        await fetch('http://localhost:5001/api/posts', {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ _id: params.id, content: changedTodo })
        })
        redirect("/")
    }

    const response = await fetch(`http://localhost:5001/api/posts/${params.id}`, { //получаємо певний todo по id яке ми получили при динамічному переході
        method: 'GET'
    })
    const todo = await response.json()

    return (
        <div className='py-[1%]'>
            <div className='flex justify-center'>
                <h3 className='text-[24px]'>Change Todo: </h3>
            </div>
            <div className='flex justify-center'>
                <form action={changeTodo}>
                    <div className='flex flex-col gap-1'>
                        <input className='border-2 border-black rounded h-[30px] w-[400px]' type="text" name='content' defaultValue={todo.content} />
                        <div className='flex justify-between'>
                            <button className='p-2 rounded hover:text-green-500 hover:bg-white' type='submit'>Apply changes</button>
                            <Link className='p-2 rounded hover:text-red-600 hover:bg-white' href="/">Cancel</Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
