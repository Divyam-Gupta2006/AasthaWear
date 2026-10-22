export default function Steps({ at }) {
  return (<div className="steps">{['Bag', 'Details', 'Payment'].map((s, i) => <span key={s} className={i <= at ? 'on' : ''}><i />{s}</span>)}</div>);
}
