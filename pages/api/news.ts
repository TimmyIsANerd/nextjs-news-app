import axios, { AxiosRequestConfig } from 'axios'

export default async function handler(req:any, res:any) {
    if (req.method === 'GET') {
        const options: AxiosRequestConfig = {
            method: 'GET',
            url: 'https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/search/NewsSearchAPI',
            params: {
                q: req.query.query,
                pageNumber: '1',
                pageSize: '10',
                autoCorrect: 'true',
                fromPublishedDate: 'null',
                toPublishedDate: 'null'
            },
            headers: {
                'x-rapidapi-host': 'contextualwebsearch-websearch-v1.p.rapidapi.com',
                'x-rapidapi-key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY
            }
        };

        axios.request(options)
            .then((response) => {
                return res.status(200).json(response.data);
            })
            .catch((err) => {
                console.log(err);
            })
    } else {
        res.status(400)
    }
}