import { useEffect, useState } from "react";
import PhotosUploader from "../PhotosUploader";
import Perks from "../perks";
import AccountNav from "../AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function PlacesFormPage(){

    const {id} = useParams();
    const [title , setTitle] = useState('');
    const [address , setAddress] = useState('');
    const [addedPhotos , setAddedPhotos] = useState([]);
    const [description , setDescription] = useState('');
    const [perks , setPerks] = useState([]);
    const [extraInfo , setExtraInfo] = useState('');
    const [checkIn , setCheckIn] = useState('');
    const [checkOut , setCheckOut] = useState('');
    const [maxGuests , setMaxGuests] = useState(1);
    const [price , setPrice] = useState(100);
    const [redirect , setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/places/'+id).then(response => {
           const {data} = response;
           setTitle(data.title);
           setAddress(data.address);
           setAddedPhotos(data.photos);
           setDescription(data.description);
           setPerks(data.perks);
           setExtraInfo(data.extraInfo);
           setCheckIn(data.checkIn);
           setCheckOut(data.checkOut);
           setMaxGuests(data.maxGuests);
           setPrice(data.price);
        });
      }, [id]);

    function inputHeader(text){
        return (
            <h2 className="text-2xl mt-4">{text}</h2>
        );
    }

    function inputDescription(text){
        return(
            <p className="text-gray-500 text-sm">{text}</p>
        );
    }

    function preInput (header , description){
        return(
            <>
            {inputHeader(header)}
            {inputDescription(description)}
            </>
        )
    }
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
          title, address, addedPhotos,
          description, perks, extraInfo,
          checkIn, checkOut, maxGuests,price 
        };
        if (id) {
          // update
          await axios.put('/places', {
            id, ...placeData
          });
          setRedirect(true);
        } else {
          // new place
          await axios.post('/places', placeData);
          setRedirect(true);
        }
    
      }
    if(redirect){
        return(<Navigate to={'/account/places'}/>)
    }

    return(<div>
        <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('Title', 'title for your place should be short and catchy as in advertisement')}  
            <input 
            type="text" 
            placeholder="title , for example : My lovely Apartment"
            value={title}
            onChange={ev => setTitle(ev.target.value)}/>

            {preInput('Address', 'Address to this place')}
            <input 
            type="text" 
            placeholder="address"
            value={address}
            onChange={ev => setAddress(ev.target.value)}/>

            {preInput('Photos', 'More photos , more elaborative')}
            
            <PhotosUploader addedPhotos = {addedPhotos} onChange = {setAddedPhotos} />

            {preInput('Description', 'Description of the place')}
            
            <textarea className="w-full border my-2 py-2 px-3 rounded-2xl"
            value={description}
            onChange={ev => setDescription(ev.target.value)}
            />

            {preInput('Perks', 'select all the perks of your place')}
            <div className="gap-2 mt-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                <Perks selected = {perks} onChange = {setPerks}/>
            </div>

            {preInput('Extra Info' , 'house rules , etc..')}
            <textarea value={extraInfo}
            onChange={ev => setExtraInfo(ev.target.value)} 
            className="w-full border my-2 py-2 px-3 rounded-2xl"/>

            {preInput('Check in&out times' , 'add checkin and checkout times , remember to have some time window for cleaning')}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 ">
                <div>
                    {preInput('Check in time')}
                    <input type="text"value = {checkIn}
                    onChange={ev => setCheckIn(ev.target.value)}
                    placeholder="14" />
                </div>
                <div>
                    {preInput('Check out time')}   
                    <input type="text" placeholder="11"
                    value={checkOut}
                    onChange={ev => setCheckOut(ev.target.value)} />
                </div>
                <div>
                    {preInput('Max number of Guests')} 
                    <input type="number" placeholder="2"
                    value={maxGuests}
                    onChange={ev => setMaxGuests(ev.target.value)} />
                </div>
                <div>
                    {preInput('Price per night')} 
                    <input type="number" placeholder="2"
                    value={price}
                    onChange={ev => setPrice(ev.target.value)} />
                </div>
            </div>
            <div>
                <button className="my-4 primary">Save</button>
            </div>
        </form>
    </div>);
}