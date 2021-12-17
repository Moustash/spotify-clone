import {
  HeartIcon,
  HomeIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSpotify from "../hooks/useSpotify";
import { SidebarItem } from "./SidebarItem";
import { useRecoilState } from "recoil";
import { playlistIdState } from '../atoms/playlistAtoms'




export const Sidebar = () => {
  const spotifyApi = useSpotify()
  const { data: session, status } = useSession()
  const [playlists, setPlaylists] = useState([])
  const [playlistId, setPlaylistId] = useRecoilState(playlistIdState)

  useEffect(() =>{
    if(spotifyApi.getAccessToken()){
      spotifyApi.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items)
      })
    }
  },[session, spotifyApi])

  const displayPlaylists = (playlists) => {
    return(playlists.map((playlist) =>{
      return(
        <SidebarItem
          text={playlist.name}
          icon={<HeartIcon className="h-4 w-4" />}
          onClick={()=>{setPlaylistId(playlist.id)}}
        />)
    }))
  }




  return (
    <div className="text-zinc-500  p-5 text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen sm:max-w-[12rem] lg:max-w-[15rem] lg:text-sm">
      <div className="space-y-4">
        <SidebarItem
          text="Logout"
          onClick={() => {
            signOut();
          }}
        />
        <SidebarItem icon={<HomeIcon className="h-4 w-4" />} text="Home" />
        <SidebarItem icon={<SearchIcon className="h-4 w-4" />} text="Search" />
        <SidebarItem
          icon={<LibraryIcon className="h-4 w-4" />}
          text="Library"
        />

        <hr className="border-t-[0.1px]" />

        <SidebarItem
          icon={<PlusCircleIcon className="h-4 w-4" />}
          text="New playlist"
        />
        <SidebarItem
          icon={<RssIcon className="h-4 w-4" />}
          text="Your episodes"
        />
        <SidebarItem icon={<HeartIcon className="h-4 w-4" />} text="Favs" />
        <hr className="border-t-[0.1px]" />

        {/* PLAYLISTS */}

        {displayPlaylists(playlists)}

      </div>
    </div>
  );
};

