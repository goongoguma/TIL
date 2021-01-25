import './App.css';
import { SliderData } from './components/SliderData';
import ImageSlider from './components/ImageSlider';
// https://www.youtube.com/watch?v=l1MYfu5YWHc

function App() {
  return <ImageSlider slides={SliderData} />
}

export default App;
