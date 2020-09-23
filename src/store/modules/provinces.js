import provinces from "../../provinces.json";

const province = {
    state: {
        myProvinces: provinces
    },
    getters: {
        myProvince(state){
            return state.myProvinces
        }
    },
    mutations: {

    },
    actions: {
        compareItem(a, b){
            if(a.th < b.th){
                    return -1;
            }else if(a.th > b.th){
                    return 1;
            }else{
                    return 0;
            }
        }
    }
}
export default province;