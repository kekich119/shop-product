export default function Footer() {
  return (
    <footer className="bg-white mt-10 border-t">
      <div className="container mx-auto px-4 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. Все права защищены.
      </div>
    </footer>
  )
}