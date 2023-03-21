import PropTypes from 'prop-types';
import './index.scss';
import Card from '../../components/Card';
import CardPlaceholder  from '../../components/CardPlaceholder';
// import {useAuth} from "../../services/AuthService";
import {httpClient} from "../../services/HttpService";
import { useEffect, useState } from 'react';

const Home = () => {
    // const {userInfo} = useAuth();
    const [experiences, setExperience] = useState<any>();
    useEffect( () => {
		const fetchExperiences = async() => {
			const experienceList = await httpClient.get('/experiences').then(resp => resp.data);
            console.log('test----', experienceList)
            setExperience(experienceList);
		}
        fetchExperiences()
			.catch(console.error);
	},[]);
    // const mainData = [
    //     {
    //         id: 1,
    //         title: 'Portland',
    //         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    //         date: '04-28-2019',
    //         imgUrl: 'https://www.bigdropinc.com/wp-content/uploads/2020/02/optimum-small-min-370x400.jpeg'
    //     },
    //     {
    //         id: 2,
    //         title: 'Las Vegas',
    //         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    //         date: '04-28-2019',
    //         imgUrl: 'https://www.bigdropinc.com/wp-content/uploads/2020/02/optimum-small-min-370x400.jpeg'
    //     },
    //     {
    //         id: 3,
    //         title: 'Chicago',
    //         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    //         date: '04-28-2019',
    //         imgUrl: 'https://www.bigdropinc.com/wp-content/uploads/2020/02/optimum-small-min-370x400.jpeg'
    //     },
    //     {
    //         id: 4,
    //         title: 'Berlin',
    //         description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum',
    //         date: '04-28-2019',
    //         imgUrl: 'https://www.bigdropinc.com/wp-content/uploads/2020/02/optimum-small-min-370x400.jpeg'
    //     }
    // ]
    return (
        <div className="Home">
           <p className='Home__title'>Experiences</p>
           <div className='Home__listing'>
                {
                    experiences?.length > 0 && experiences?.map((data: any) => {
                        return <div key={data.id} className="Home__card">
                            <Card key={data.id} place={data.title} experience={data.experience} imgUrl={data.imgUrl} />
                        </div>
                    })
                }
                <CardPlaceholder />
           </div>
        </div>
    )
}

// Home.prototype = {
//     experiences: PropTypes.array,
//  }

 export default Home;