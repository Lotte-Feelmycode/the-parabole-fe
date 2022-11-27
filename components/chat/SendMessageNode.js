export default function SendMessageNode({ text }){


  return (
    <div className="flex flex justify-end mb-2">
      <div className="bg-blue-600 p-2 text-white inline-block rounded-lg">
        {text}
      </div>
    </div>
  )
}
