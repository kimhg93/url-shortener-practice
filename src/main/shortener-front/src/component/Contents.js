import React, {useState, useRef} from 'react';
import axios from "axios";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";

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
                <FormControl>
                    <br/>
                    <TextField label="inputURL" type="url" variant="outlined" ref={inputURL} />
                    <br/>
                    <TextField label="result" type="url" variant="outlined" value={result} />
                    <br/>
                    <Button variant="contained" onClick={convert}>단축 URL 생성</Button>
                </FormControl>
                <QRCodeModal url={result}/>
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