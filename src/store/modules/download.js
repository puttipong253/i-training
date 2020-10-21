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
      downloadCustomer(){
        API.get(`/export-customers`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"Customers");
           })
           .catch(error => (
             console.log(error)
           ))
      },
      downloadListCustomer(){
        API.get(`/export-ListCustomers`,{
            responseType: 'blob'
        })
           .then((res) => {
                FileSaver.saveAs(res.data,"listCustomers");
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