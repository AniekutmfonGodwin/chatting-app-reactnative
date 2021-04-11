import axios from "axios";

export default class{
    constructor(){
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();
        this.baseURL = "http://192.168.43.17:1337"

        this.axios = axios.create({
            baseURL:this.baseURL,
            cancelToken: source.token,

        })
        this.abort = ()=>source.cancel('Operation canceled by the user.')

        

    }



    
    /**
     * 
     * @param {File} file 
     * @returns {File}
     */
    expoImageToFile(file){
        let localUri = file.uri;
        let filename = localUri.split('/').pop();

        // Infer the type of the image
        let match = /\.(\w+)$/.exec(filename);
        let type = match ? `image/${match[1]}` : `image`;
        return { uri: localUri, name: filename, type }

    }


    /**
     * 
     * @param {string} path 
     * @returns
     */
    count(path){
        return this.axios.request({
            url:`/${path}/count/`
        })

    }
    

    /**
     * 
     * @param {string} path 
     * @param {object} param1 
     * @param {object} param1.data 
     * @returns 
     */
    create(path,{data}){
        return this.axios.request({
            url:`/${path}`,
            method:"POST",
            data
        })

    }


    /**
     * 
     * @param {string} path 
     * @param {object} param1 
     * @param {object} param1.id 
     * @returns 
     */
    delete(path,{id}){
        return this.axios.request({
            url:`/${path}/${id}`,
            method:"DELETE"
        })

    }


    /**
     * 
     * @param {string} path 
     * @param {object} param1 
     * @param {object} param1.params 
     * @param {string} param1.paramsStr
     * @returns 
     */
    find(path,{params,paramsStr}={params:{}}){

        return this.axios.request({
            url:paramsStr?`/${path}/${paramsStr}`:`/${path}`,
            params
        })

    }

    /**
     * 
     * @param {string} path 
     * @param {object} param1 
     * @param {number|string} param1.id 
     * @returns 
     */
    findOne(path,{id}){
        return this.axios.request({
            url:`/${path}/${id}`
        })

    }

    /**
     * 
     * @param {string} path 
     * @param {object} param1 
     * @param {object} param1.data
     * @param {string|number} param1.id
     * @returns 
     */
    update(path,{data,id}){
        return this.axios.request({
            url:`/${path}/${id}`,
            data,
            method:'PUT'
        })
    }


    fileSettings(){
        return this.axios.request({
            url:`/upload/settings`,
        })
    }


    /**
     * 
     * @param {object} param0 
     * @param {string|number} param0.id
     * @returns 
     */
    search({id}){
        return this.axios.request({
            url:`/upload/search/${id}`,
        })
    }





    /**
     * 
     * @param {object} param0 
     * @param {File} param0.files
     * @returns 
     */
    upload({files}){
        let data = new FormData();
        data.append('files', files);
        return this.axios.request({
            url:`/upload`,
            data,
            method:'POST',
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    }

}