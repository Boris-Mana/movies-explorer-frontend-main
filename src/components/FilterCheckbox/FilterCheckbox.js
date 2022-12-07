import { Route } from "react-router-dom";

import showShortSwitcherOn from "../../images/smalltumb.svg";
import showShortSwitcherOff from "../../images/smalltumboff.svg";

function FilterCheckbox({ isChecked, isCheckedSaved, onCheckbox }) {

    return (
        <div className="switch-box">
            <button className="switch-box__switcher" onClick={onCheckbox}>
                <Route path="/movies">
                    <img src={isChecked ? showShortSwitcherOn : showShortSwitcherOff} alt="Показать короткометражки" />
                </Route>
                <Route path="/saved-movies">
                    <img src={isCheckedSaved ? showShortSwitcherOn : showShortSwitcherOff} alt="Показать короткометражки" />
                </Route>

            </button>
            <p className="switch-box__text">
                Короткометражки
            </p>
        </div>
    );
}

export default FilterCheckbox;