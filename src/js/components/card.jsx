import moment from 'moment';

import React, { Component } from 'react';
import Card from 'material-ui/lib/card/card';
import CardMedia from 'material-ui/lib/card/card-media';
import CardActions from 'material-ui/lib/card/card-actions';
import CardTitle from 'material-ui/lib/card/card-title';
import FlatButton from 'material-ui/lib/flat-button';
import CardText from 'material-ui/lib/card/card-text';
import MapsLocalShipping from 'material-ui/lib/svg-icons/maps/local-shipping';
import NotificationEventNote from 'material-ui/lib/svg-icons/notification/event-note';
import SocialNotificationsActive from 'material-ui/lib/svg-icons/social/notifications-active';

import Colors from 'material-ui/lib/styles/colors';

export class CardComponent extends Component {
    render() {
        const cardStyle = {
            marginTop: 10,
            marginBottom: 10
        };

        if (this.props.type === 'card.schedule') {
            return (
                <Card style={ cardStyle }>
                    <CardMedia>
                        <img src={ this.props.image } />
                    </CardMedia>
                    <CardTitle title={ this.props.title } subtitle={ this.props.description } />
                    <CardActions>
                        <FlatButton primary={ true } label={ this.props.actions_primary } />
                    </CardActions>
                </Card>
                );
        } else if (this.props.type === 'card.tracking') {
            const mediaStyle = {
                overflow: 'hidden',
                position: 'relative',
                height: 120
            };

            const iconStyle = {
                height: 206,
                left: -55,
                top: -26,
                position: 'absolute'
            };

            return (
                <Card style={ cardStyle }>
                    <CardMedia style={ mediaStyle }>
                        <MapsLocalShipping style={ iconStyle } color={ Colors.green500 } />
                    </CardMedia>
                    <CardTitle title="Track your shipment" subtitle={ `${this.props.trackingNumber} from ${this.props.carrier}` } />
                    <CardActions>
                        <FlatButton primary={ true }
                                    label="Track"
                                    linkButton={ true }
                                    target='_blank'
                                    href={ this.props.trackingUrl } />
                    </CardActions>
                </Card>
                );
        } else if (this.props.type === 'card.calendar.reminder') {
            const mediaStyle = {
                overflow: 'hidden',
                position: 'relative'
            };

            const iconStyle = {
                height: 75,
                left: -100,
                bottom: 0,
                position: 'absolute'
            };


            const ts = moment(this.props.timestamp);
            return (
                <Card style={ cardStyle }>
                    <CardMedia style={ mediaStyle }>
                        <img src={ this.props.image } />
                        <SocialNotificationsActive style={ iconStyle } color={ Colors.white } />
                    </CardMedia>
                    <CardTitle title={ `${this.props.title} at ${this.props.location}` } subtitle={ ts.fromNow() } />
                    <CardActions>
                        <FlatButton primary={ true }
                                    label={ this.props.primaryActionText }
                                    linkButton={ true }
                                    target='_blank'
                                    href={ this.props.primaryActionUri } />
                        <FlatButton secondary={ true }
                                    label='Add to my calendar'
                                    linkButton={ true }
                                    target='_blank'
                                    href={ this.props.primaryActionUri } />
                    </CardActions>
                </Card>
                );
        }
    }
}
