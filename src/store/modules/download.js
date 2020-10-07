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
      downloadListUser(){
        API.get(`/export-listUsers`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"listUsers");
           })
           .catch(error => (
             console.log(error)
           ))
      },
      downloadRoom(){
        API.get(`/export-room`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"room");
           })
           .catch(error => (
             console.log(error)
           ))
      },
    }
}
export default download;