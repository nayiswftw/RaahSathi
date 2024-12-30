import { Button } from '@/components/ui/button';
import Footer from '@/components/ui/custom/Footer';
import { Input } from '@/components/ui/input';
import { AI_PROMPT, SelectBudget, SelectCompanions } from '@/constants/options';
import { toast } from '@/hooks/use-toast';
import { db } from '@/service/firebaseConfig';
import { chatSession } from '@/service/GeminiModal';
import { doc, setDoc } from 'firebase/firestore';
import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Section = ({ title, children }) => (
  <div className='mt-10'>
    <h2 className='text-xl my-3 font-medium'>{title}</h2>
    {children}
  </div>
);

const OptionGrid = ({ options, selectedOption, handleInputChange }) => (
  <div className='grid grid-cols-3 gap-5'>
    {options.map((option, index) => (
      <div key={index} className={`p-4 border rounded-lg hover:shadow-lg cursor-pointer ${selectedOption === (options === SelectCompanions ? option.people : option.title) ? 'shadow-lg border-black' : ''}`}
        onClick={() => handleInputChange(options === SelectCompanions ? 'companions' : 'budget', options === SelectCompanions ? option.people : option.title)}>
        <h2 className='text-4xl'>{option.icon}</h2>
        <h2 className='font-bold text-lg'>{option.title}</h2>
        <h2 className='text-sm text-gray-500'>{option.desc}</h2>
      </div>
    ))}
  </div>
);

function CreateTrip() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: '',
    companions: ''
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);


  const onGenerateTrip = async() => {
    
    if(!formData.destination || !formData.days || !formData.budget || !formData.companions) {
      toast({
        variant: 'destructive',
        title: 'Please fill all the fields to generate a trip',
      });
      return;
    }
    // console.log(formData);
    const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', formData?.destination)
    .replace('{totalDays}', formData?.days)
    .replace('{traveller}', formData?.companions)
    .replace('{budget}', formData?.budget)
    .replace('{totalDays}', formData?.days)

    // console.log(FINAL_PROMPT);

    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
  }  

  const SaveAiTrip= async(Tripdata) => {
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      tripdata: JSON.parse(Tripdata),
      id: docId
    });

    navigate(`/view-trip/${docId}`);
  }
  return (
    <div className='px-56 mt-10'>
      <h2 className='font-bold text-3xl'>Let's Plan Your Dream Getaway</h2>
      <p className='mt-3 text-gray-500 text-xl'>Share a few details with us, and we'll tailor an unforgettable journey just for you.</p>

      <Section title="Where would you like to go?">
        <Input placeholder="Ex. Las Vegas" onChange={(e) => handleInputChange('destination', e.target.value)} />
      </Section>

      <Section title="How long do you plan to stay?">
        <Input placeholder="Ex. 3" type="number" onChange={(e) => handleInputChange('days', e.target.value)} />
      </Section>

      <Section title="What's your ideal budget for this adventure?">
        <OptionGrid options={SelectBudget} selectedOption={formData.budget} handleInputChange={handleInputChange} />
      </Section>

      <Section title="Who will be joining you on this journey?">
        <OptionGrid options={SelectCompanions} selectedOption={formData.companions} handleInputChange={handleInputChange} />
      </Section>

      <div className='mb-10 mt-10 justify-end flex'>
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>

      <Footer />
    </div>
  );
}

export default CreateTrip;
