import React, {useState, useRef} from 'react';
import {Button, Form} from "react-bootstrap";
import axios from "axios";

import QRCodeModal from "./QRCodeModal";

import PropTypes from 'prop-types';

const Contents = props => {
    const [result, setResult] = useState("");
    const inputURL = useRef(null);

    const convert = async () => {
        let data = { original: inputURL.current.value };

        if(data.original != "") {
            try{
                const response = await axios.post("/generate", data);
                setResult(response.data.URL);
            } catch (e) {
                console.log(e)
            }
        } else alert("input is null");
    };

    return (
        <div>
            <main>
                <Form>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>URL</Form.Label>
                        <Form.Control type="text" placeholder="URL" ref={inputURL} />
                        <Form.Label>Result</Form.Label>
                        <Form.Control type="text" value={result} />
                        <Button variant="primary" onClick={convert}>단축 URL 생성</Button>
                        <QRCodeModal url={result}/>
                    </Form.Group>
                </Form>
            </main>
        </div>
    );
};


Contents.propTypes = {
    text: PropTypes.string,
    number: PropTypes.number,
};
Contents.defaultProps = {
    text: "디폴트 문자열",
};
export default Contents;