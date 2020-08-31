import api from '../services/api'

export default class HostServices{

    constructor(){}

    async getCards() {
        try {
            let response = await api.get(`api/hosts/get_cards/`,);        
            return response
        } 
        catch(error) {
            return false
        }
    }

    async getGraphs() {
        try {
            let response = await api.get(`api/hosts/get_graphics/`);         
            return response
        }
        catch(error) {
            return false
        }
    }

    async getTopTen() {
        try {
            let response = await api.get(`api/hosts/get_top_ten/`);      
            return response
        }
        catch(error) {
            return false
        }
    }

  
    async listHost(){
        try {
            let response = await api.get('api/hosts/list_hosts_per_row/')
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
            
            return response
        }
        catch(error){
            return false
        }
        
    }

    async importCSV(payload){
        try {
            await api.post(`api/hosts/import_csv_file/`, payload);
            return true
        }
        catch(error){
            return false
        }
    }

    async listFilesCSV(){
        try {
            let response = await api.get(`api/hosts/get_all_files/`);
            return response
        }
        catch(error){
            return false
        }
        
    }
  
}