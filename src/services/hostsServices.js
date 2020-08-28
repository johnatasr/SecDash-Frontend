import api from '../services/api'

export default class HostServices{

    constructor(){}

    async getCards() {
        try {
            let response = await api.get(`api/hosts/get_cards/`,);      

            if (response.data.lengh === 0){
                return false
            }
            return response.data
        } 
        catch(error) {
            return false
        }
    }

    async getGraphs() {
        try {
            let response = await api.get(`api/hosts/get_graphics/`);      
        
            if (response.data.lengh === 0){
                return []
            }
            return response.data
        }
        catch(error) {
            return []
        }
    }

    async getTopTen() {
        try {
            let response = await api.get(`api/hosts/get_top_ten/`);      
        
            if (response.data.lengh === 0){
                return []
            }
            return response.data
        }
        catch(error) {
            return []
        }
    }

  
    async listHost(){
        try {
            let response = await api.get('api/hosts/list_hosts_per_row/')

            if (response.data.lengh === 0){
                return []
            }
            return response
        }
        catch(error){
            return false
        }
    }
    
    async filterHosts(vulnerabilityTitle){
        try {
            let response = await api.get(`api/hosts/filter_hosts_per_row/`, { 
                params: {
                    vulnerabilityTitle: vulnerabilityTitle
                }});
            
            if (response.data.lengh === 0 ) {
                return false
            }
            
            return response.data
        }
        catch(error){
            return false
        }
        
    }

    async importCSV(payload){
        try {
            let response = await api.post(`api/hosts/import_csv_file/`, payload);
        
            if (response.status === 200 || response.status === 201) {
                return true
            }
            else {
                return false
            }
        }
        catch(error){
            return false
        }
    }

    async listFilesCSV(){
        try {
            let response = await api.get(`api/hosts/get_all_files/`);
        
            if (response.data.lengh === 0) {
                return false
            }
            else {
                return response.data
            }
        }
        catch(error){
            return false
        }
        
    }
  
}