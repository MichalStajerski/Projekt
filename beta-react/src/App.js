import logo from './logo.svg';
import './App.css';
import Profile from './Profile';
import { people } from './data';

export default function Gallery () {
    return(
        <section>
        {people.map(person => (
            <Profile 
                key = {person.id}
                name = {person.name}
                imageId = {person.imageId}
            />
        ))}
        </section>
    );
}
