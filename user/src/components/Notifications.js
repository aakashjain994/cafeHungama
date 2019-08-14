import React, { Component } from 'react';
import Pusher from 'pusher-js';
class Notifications extends Component {
    render() {
        Pusher.logToConsole = true;
        var pusher = new Pusher('2650b5b1610744e74733',{
            cluster:'ap2',
            forceTLS:true
        });
        var channel = pusher.subscribe('booking');

        channel.bind('1@gmail.com',function(data){
            alert('ticket confirmed');
            console.log(data);
        })
        return (
            <div>

            </div>
        );
    }
}

export default Notifications;