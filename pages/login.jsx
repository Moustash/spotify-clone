import {getProviders, signIn} from "next-auth/react"

function Login({providers}){
  return(
    <div className="bg-black text-white justify-center w-full items-center min-h-screen flex flex-col">
    <div className="mb-20 uppercase text-center font-bold ">
      <h1>Welcome to Moustash's Spotify clone</h1>
      <h3>Built in NextJS in december 2021</h3>
    </div>
      <img className="w-52 mb-5" src="https://links.papareact.com/9xl"/>
      {Object.values(providers).map((provider) => {
        return(
        <div key={provider?.id}>
          <button 
            className="bg-[#18D860] text-white p-5 rounded-full"
            onClick={() => signIn(provider.id, {callbackUrl: "/"})}
          >
            Login with {provider?.name}
          </button>
        </div>
        )
      })}
    </div>
  )
}

export default Login

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props:{
      providers,
    }
  }
}