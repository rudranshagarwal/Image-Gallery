import logo from './logo.svg';
import './output.css';
import { useState } from 'react'
import Modal from 'react-modal';

Modal.setAppElement('#root');




function App() {

    let iskeydown = {
        'ArrowLeft': false,
        'ArrowRight': false,
        'ArrowDown': false,
        'ArrowUp': false,

    }
    const [open, setopen] = useState([0, 0, 0, 0, 0, 0])
    document.onkeydown = (event) => {
        console.log(event)
        iskeydown[event.key] = true;
        var newselection = [...selection]
        if (iskeydown['ArrowLeft']) {
            event.preventDefault()
            console.log('left')
            newselection[1] = selection[1] >  0 ? selection[1] - 1 : selection[1]
        }
        if (iskeydown['ArrowRight']) {
            event.preventDefault()
            console.log('right')
            newselection[1] = selection[1] <  3 ? selection[1] + 1 : 0
        }
        if (iskeydown['ArrowUp']) {
            event.preventDefault()
            console.log('up')
            newselection[0] = selection[0] >  0 ? selection[0] - 1 : selection[0]
        }
        if (iskeydown['ArrowDown']) {
            event.preventDefault()
            console.log('down')
            newselection[0] = selection[0] + 1 
        }
        setselection(newselection)
        var new_open = Array(open.length).fill(0)
        new_open[3*newselection[0] + (newselection[1] % open.length)] = 1
        setopen(new_open)
    }

    document.onkeyup = (event) => {
        iskeydown[event.key] = false;
    }

    const [image_urls, setimage_urls] = useState(["https://images.unsplash.com/photo-1692007081099-eacaf058af14?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1692207900215-604d478d24c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1692270941648-20e0f24daebc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTh8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1691965811796-e69e28e7c19f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1692401891528-44cf0c97154e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NDd8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60",
        "https://images.unsplash.com/photo-1692381449097-5d93f922ca0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8NTJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"])
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [selection, setselection] = useState([0,0]);
    const [image_names, setimage_names] = useState(['flower', 'space', 'festival', 'landscape', 'metallic', 'beach'])
    console.log(selection)

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setInputValue(''); // Reset input value when closing the modal
    };

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        var newimage_urls = [...image_urls]
        newimage_urls.push(inputValue)
        setimage_urls(newimage_urls)
        console.log('Input value:', inputValue);
        closeModal();
    };


    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [inputValue2, setInputValue2] = useState('');

    const [index, setIndex] = useState(-1);

    const openModal2 = (index) => {
        setModalIsOpen2(true);
        setIndex(index)
        console.log(index)
    };

    const closeModal2 = () => {
        setModalIsOpen2(false);
        setInputValue2(''); // Reset input value when closing the modal
    };
    console.log(open)
    const handleInputChange2 = (event) => {
        
        setInputValue2(event.target.value);
    };

    const handleSubmit2 = (event) => {
        event.preventDefault();

        var newimage_names = [...image_names]
        newimage_names[index] = inputValue2
        setimage_names(newimage_names)
        closeModal2();
    };

   
    const display = image_urls.map((image_url, index) => {

        if(open[index] == 0)
        {

            return <div class="container w-full h-full rounded transition-transform transform hover:scale-105" >
                <img style={{ verticalAlign: "center" }} src={image_url}
                    alt="image" />
                <button style={{
                    textAlign: "center", verticalAlign: "bottom", color: "White", fontSize: "20px", background: "none",
                    border: "none"
                }} onClick={() => openModal2(index)} >{image_names[index]}</button>

            </div>
        }
        else
        {
            return <div class="scale-105 hover:scale-105" >
                <img style={{ verticalAlign: "center" }} src={image_url}
                    alt="image" />
                <button style={{
                    textAlign: "center", verticalAlign: "bottom", color: "White", fontSize: "20px", background: "none",
                    border: "none"
                }} onClick={() => openModal2(index)} >{image_names[index]}</button>

            </div>
        }
    })
    return (


        <div class="container mx-auto space-y-2">

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}


            >
                <form class="bg-slate-400" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Enter image url"
                    />
                    <button type="submit" onClick={handleSubmit}>Submit</button>
                    <button onClick={closeModal}>Cancel</button>
                </form>
            </Modal>

            <Modal
                isOpen={modalIsOpen2}
                onRequestClose={closeModal2}


            >
                <form class="bg-slate-400" onSubmit={handleSubmit2}>
                    <input
                        type="text"
                        value={inputValue2}
                        onChange={handleInputChange2}
                        placeholder="Enter new name"
                    />
                    <button type="submit" onClick={handleSubmit2}>Submit</button>
                    <button onClick={closeModal2}>Cancel</button>
                </form>
            </Modal>
            <div>
                <button className="button" role="button" onClick={openModal}>Add Image</button>
            </div>
            <div class="grid-cols-3 p-20 space-y-2 bg-slate-800 lg:space-y-0 lg:grid lg:gap-3 lg:grid-rows-3">

                {display}

            </div>
        </div>

    );
}

export default App;
