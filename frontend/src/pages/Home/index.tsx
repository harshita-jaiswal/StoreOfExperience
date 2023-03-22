import PropTypes from 'prop-types';
import './index.scss';
import Card from '../../components/Card';
import CardPlaceholder  from '../../components/CardPlaceholder';
import {httpClient} from "../../services/HttpService";
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [experiences, setExperience] = useState<any>();
    useEffect( () => {
		const fetchExperiences = async() => {
			const experienceList = await httpClient.get('/experiences').then(resp => resp.data);
            setExperience(experienceList);
		}
        fetchExperiences()
			.catch(console.error);
	},[]);
    return (
        <div className="Home">
           <p className='Home__title'>Experiences</p>
           <div className='Home__listing'>
                {
                    experiences?.length > 0 && experiences?.map((data: any) => {
                        return <Link key={data.id} className="Home__card" to={"/experience/" + data.id}>
                             {/* <Link className='Header__menu-item' to="/home"> */}
                            <Card key={data.id} place={data.title} experience={data.experience} imgUrl={data.imgUrl} />
                        </Link>
                    })
                }
                <CardPlaceholder />
           </div>
        </div>
    )
}

 export default Home;