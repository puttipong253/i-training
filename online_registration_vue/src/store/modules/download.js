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
      download(){
        API.get(`/export`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"Users");
           })
      }
    }
}
export default download;