import { useGetGroupQuery } from "../../api/apiSlice"


const ShowGroup =({groupId})=>{
    const {data :group} = useGetGroupQuery(groupId)
    
    
    return(
        
            <p className="px-4 py-1.5 block w-fit rounded-full flex justify-center items-center font-bold" style={{color:group?.color , background:group?.bg  }}>
             {group?.name} 
        </p> 
        
       
    )
}
export default ShowGroup