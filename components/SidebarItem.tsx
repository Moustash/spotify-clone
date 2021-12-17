import { FunctionComponent } from "react"

interface SidebarItemProps {
  icon?: any,
  text: any,
  onClick?: () => void
}

export const SidebarItem: FunctionComponent<SidebarItemProps> = ({icon, text, onClick}) => {
  return(
    <button onClick={onClick} className="hover:text-white cursor-pointer flex items-center space-x-2">
      {icon && icon}
      <p className="text-left">{text}</p>
    </button>
  )
}