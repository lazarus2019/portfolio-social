import classNames from "classnames/bind";
import styles from "./Board.module.scss";

const cx = classNames.bind(styles);
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { Picker } from "emoji-mart";
import "emoji-mart/css/emoji-mart.css";

function EmojiPicker(props) {
  const { icon, onChange } = props;
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const [isShowPicker, setShowPicker] = useState(false);

  useEffect(() => {
    if (icon) {
      setSelectedEmoji(icon);
    }
  }, [icon]);

  const selectEmoji = (e) => {
    const sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...codesArray);
    setShowPicker(false);
    if (!onChange) return;
    onChange(emoji);
  };

  const showPicker = () => setShowPicker(!isShowPicker);

  const handleClosePicker = () => {
    setShowPicker(false);
  };

  return (
    <div className={cx("emoji-container")}>
      <div className={cx("emoji-icon")} onClick={showPicker}>
        {selectedEmoji}
      </div>
      <div className={cx("emoji-box", `${isShowPicker ? "show" : ""}`)}>
        <div class="veil" onClick={handleClosePicker}></div>
        <Picker theme="dark" onSelect={selectEmoji} showPreview={false} />
      </div>
    </div>
  );
}

EmojiPicker.propTypes = {};

export default EmojiPicker;
