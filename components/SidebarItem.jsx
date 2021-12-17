import { FunctionComponent } from "react"

export const SidebarItem = ({icon, text, onClick}) => {
  return(
    <button onClick={onClick} className="hover:text-white cursor-pointer flex items-center space-x-2">
      {icon && icon}
      <p className="text-left">{text}</p>
    </button>
  )
}