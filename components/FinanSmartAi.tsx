function FinanSmartAi() {
  return (
    <div className="h-auto w-full border border-white rounded-md p-5 my-10">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-3">
          <h1 className="text-2xl font-bold">FinanSmart AI</h1>
          <p className="text-[#bcbcbc]">
            Get insights on your spending pattern and get suggestions on how to
            save more
          </p>
        </div>
        <div className="flex items-center gap-5">
          <button className="bg-[#193295] text-white rounded-md px-5 py-2">
            View Insights
          </button>
          <button className="bg-[#193295] text-white rounded-md px-5 py-2">
            Get Suggestions
          </button>
        </div>
      </div>
    </div>
  );
}

export default FinanSmartAi;
