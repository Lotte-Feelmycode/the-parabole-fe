export default function MessageNode({ text }){


  return (
    <div className="flex flex-row items-stretch mb-2">
      <div className="self-end rounded-full w-8 h-8 mr-2">
        <img src="/parabole.svg" className="w-8" />
      </div>
      <div className="whitespace-pre-line	bg-gray-100 p-2 inline-block rounded-lg">
        {text}
      </div>
    </div>
  )
}
