import axios from 'axios'



const apiRequest = async () =>{

    try{

        const response =  await axios.get('https://rickandmortyapi.com/api/character')
        return response.data

    }catch(error){
        console.log(`Erro ao requisitar Api ${error}`)
    }
}






