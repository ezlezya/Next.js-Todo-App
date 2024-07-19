import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";

type DataType = {
  _id?: string,
  content: string,
}

async function deleteTodo(id: string) {
  "use server";

  await fetch(`http://localhost:5001/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  })
  revalidatePath("/")
}
export default async function Home() {

  const response = await fetch('http://localhost:5001/api/posts', {
    cache: "no-store"
  })
  const data: DataType[] = await response.json()

  return (
    <main>
      <div className="flex justify-center items-center">
        <div className="flex items-center flex-col">
          <h3 className="text-[26px]">Todos</h3>
          <Link className="text-[18px] text-green-500" href="/new">Create new todo</Link>
        </div>
      </div>
      {
        data.map((item, index) => {
          return <div key={index} className="border rounded border-black p-2 m-5">
            <h3>{item.content}</h3>
            <form className="flex justify-between items-center" action={deleteTodo.bind(null, item._id!)}> {/* видалення об'єкта з бд, важлива також замітка, що при такому підході вона видаляє сутність і з бд і з UI */}
              <button className="cursor-pointer hover:text-red-600" type="submit">delete</button>
              <Link className="hover:text-green-500" href={`/changes/${item._id}`}>Change Todo</Link>
            </form>
          </div>
        })
      }
    </main>
  );
}
