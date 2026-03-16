import { useGlobal } from "../contexts/GlobalContext";

function Saklar() {
  const { saklarSpeech, setSaklarSpeech } = useGlobal();

  return (
    <>
      <div className="d-flex justify-content-end">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            id="speechSwitch"
            value="yes"
            checked={saklarSpeech}
            onChange={() => setSaklarSpeech(!saklarSpeech)}
          />
          <label className="form-check-label" htmlFor="speechSwitch">
            suara
          </label>
        </div>
      </div>
    </>
  );
}

export default Saklar;
