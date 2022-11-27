export default function ButtonNode({ list }){


  return (
    <div className="flex flex-row items-stretch mb-2">
      <div className="self-end rounded-full w-8 h-8 mr-2">
        <img src="/parabole.svg" className="w-8" />
      </div>
      <div className="bg-gray-100 p-2 inline-block rounded-lg">
        {list && Array.isArray(list) && list.map((item, index) => (
          <button type="button" class="py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200">
            {item}
          </button>
        ))}
      </div>
    </div>
  )
}
