import React, { Component } from 'react';

export class Achiev extends Component {
    constructor(props) {
        super(props);
        this.state = {
            plants: []
        };
    }

    render() {
        return (
            <div className="landing__achievment">
                <h1 className="landing__achievment__title">Badge Collection</h1>
                <div className="landing__card landing__card__1">
                    <span className="badge_1">
                        <img
                            src="http://static0.fitbit.com/images/badges_new/300px/badge_daily_floors175.png"
                            alt=""
                        />
                        <div>first watering</div>
                    </span>
                    <span className="badge_2">
                        <img
                            src="https://vignette3.wikia.nocookie.net/khanacademy/images/3/38/Sally-ride-512x512.png/revision/latest?cb=20141027120848"
                            alt=""
                        />
                        <div>plant astronaut</div>
                    </span>
                    <span className="badge_3">
                        <img
                            src="http://static0.fitbit.com/images/badges_new/300px/badge_lifetime_miles990.png"
                            alt=""
                        />
                        <div>2 months streak</div>
                    </span>
                    <span className="badge_4">
                        <img
                            src="https://43nnuk1fz4a72826eo14gwfb-wpengine.netdna-ssl.com/wp-content/uploads/2017/07/Badges_daily_700_floors-300x300.png"
                            alt=""
                        />
                        <div>happy plants</div>
                    </span>
                </div>
                <h1 className="landing__achievment__title landing__achievment__title__2">
                    Leader Board
                </h1>
                <div className="landing__card landing__card_2">
                    <table className="tabela landing__card">
                        <tbody>
                            <tr>
                                <th>Firstname</th>
                                <th>Lastname</th>
                                <th>Num of Plants</th>
                            </tr>
                            <tr>
                                <td>Jill</td>
                                <td>Smith</td>
                                <td>20</td>
                            </tr>
                            <tr>
                                <td>Eve</td>
                                <td>Jackson</td>
                                <td>15</td>
                            </tr>
                            <tr>
                                <td>John</td>
                                <td>Doe</td>
                                <td>13</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default Achiev;
