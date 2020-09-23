import { API } from "../../API";
import FileSaver from 'file-saver'

const download = {
    state: {
       
    },
    getters: {
    
    },
    mutations: {
     
    },
    actions: {
      downloadUser(){
        API.get(`/export-users`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"users");
           })
           .catch(error => (
             console.log(error)
           ))
      },
    }
}
export default download;