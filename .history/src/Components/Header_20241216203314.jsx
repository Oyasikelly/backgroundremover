export default function Header({handleMenu}){
    return  <header>
    <h2>Background Remover</h2>
    <nav>
      <i className="fa-solid fa-bars" onClick={handleMenu}></i>
    </nav>
  </header>
}