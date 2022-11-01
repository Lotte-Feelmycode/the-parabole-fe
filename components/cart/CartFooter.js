export default function CartFooter({ length }) {
  return (
    <div className="text-right p-4">
      <span>총 {length} 개</span>
    </div>
  );
}
