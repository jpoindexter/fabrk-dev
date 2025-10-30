export default function LayoutDividersWithTitleOnLeft() {
  return (
    <div className="flex items-center">
      <div className="relative flex justify-start">
        <span className="bg-gray-900 pr-3 text-base font-semibold text-white">Projects</span>
      </div>
      <div aria-hidden="true" className="w-full border-t border-white/15" />
    </div>
  )
}
