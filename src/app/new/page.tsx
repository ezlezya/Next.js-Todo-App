import React from 'react'
import Link from 'next/link'
import { redirect } from 'next/navigation'

async function createTodo(formData: FormData) { //formData - назва може бути люба - FormData визначає що data буде братися з певно вказаного далі інпута по назві
    "use server"

    const content = formData.get("content")?.valueOf() //тут ми вказали, що такий собі content буде дорівнювати спеціальному значеню(data у цьому випадку), яка прийматиме своє тіло(get) з "content"(назва нашого інпута) ? - провірка на наявність, приймати значення(valueOf)
    const response = fetch('http://localhost:5001/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ author: "Test", title: "test", content: content })
    })
    redirect("/") //функція, яка редіректить нас до нашої головної сторінки (може редіректити до любого фолдера)
    //revalidatePath("/")  ця функція говорить, що всі дані по вказаному фолдері не дійсні, і що їх треба перезаписати на нові, тобто ця функція - це також варіант для оновлення на актуальні дані
}

export default function CreateTodo() {
    return (
        <div className='py-[1%]'>
            <div className='flex justify-center'>
                <h3 className='text-[24px]'>Create new todo: </h3>
            </div>
            <form className='flex justify-center' action={createTodo}>
                <div className='flex flex-col gap-1'>
                    <input type="text" name='content' className='border-2 border-black rounded h-[30px] w-[400px]' /> {/* name потрібний, для вище написаного кода, по ньому ми орієнтуємось звідки братимо значення */}
                    <div className='flex justify-between'>
                        <button className='rounded hover:text-green-500 hover:bg-white' type='submit'>Create Todo</button> {/* тип кнопки не обов'язковий */}
                        <Link className="rounded hover:text-red-500 hover:bg-white" href="..">Go back</Link> {/* перейти назад */}
                    </div>
                </div>
            </form>
        </div>
    )
}
