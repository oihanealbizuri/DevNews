import React from "react";
import "./Table.css";
import {Button} from "./Button.js";
import Moment from "react-moment";
import 'moment-timezone';
import 'moment/locale/en-gb.js';

export const Table = ({list, onDismiss}) =>
    <div className="table">
        {list.map(item => {
            return (
                <div key={item.objectID} className="table-row">
                    <span style={{width: '65%'}}>
                        <a href={item.url}>{item.title}</a>
                    </span>
                    <span style={{width: '25%'}}>
                      {item.author}
                    </span>
                    <span style={{width: '10%', color: 'rgba(0, 0, 0, 0.6)'}}>
                        {<Moment locale="en" fromNow>{item.created_at}</Moment>}
                    </span>
                    <span style={{width: '10%'}}>
                        <Button
                            className="dismiss-button"
                            onClick={() => onDismiss(item.objectID)}
                        >
                        Dismiss
                        </Button>
                   </span>
                </div>
            );
        })}
    </div>;
