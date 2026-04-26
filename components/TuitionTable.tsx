interface TuitionRow {
  program:    string;
  appFee1:    string;
  appFeeAdd:  string;
  supplyFee:  string;
  regFee:     string;
  bgFee:      string;
  tuitionTotal: string;
  grandTotal:   string;
}

interface TuitionCallout {
  program: string;
  total:   string;
  note:    string;
}

interface TuitionTableProps {
  rows:      TuitionRow[];
  callouts?: TuitionCallout[];
  footnote?: string;
}

export default function TuitionTable({ rows, callouts, footnote }: TuitionTableProps) {
  return (
    <>
      <div className="tuition-wrap reveal">
        <table className="tuition-table">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Program</th>
              <th>App Fee<br />1st child</th>
              <th>App Fee<br />add&apos;l</th>
              <th>Supply<br />Fee</th>
              <th>Reg.<br />Fee</th>
              <th>BG<br />/parent</th>
              <th>Tuition<br />Total</th>
              <th>Tuition +<br />Reg. Total</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td>{row.program}</td>
                <td>{row.appFee1}</td>
                <td>{row.appFeeAdd}</td>
                <td>{row.supplyFee}</td>
                <td>{row.regFee}</td>
                <td>{row.bgFee}</td>
                <td>{row.tuitionTotal}</td>
                <td>{row.grandTotal}</td>
              </tr>
            ))}
          </tbody>
          {footnote && (
            <tfoot>
              <tr>
                <td colSpan={8}>{footnote}</td>
              </tr>
            </tfoot>
          )}
        </table>
      </div>

      {callouts && callouts.length > 0 && (
        <div className="tuition-callouts reveal">
          {callouts.map((c, i) => (
            <div key={i} className="tuition-callout">
              <div className="tuition-callout__program">{c.program}</div>
              <div className="tuition-callout__total">{c.total}</div>
              <div style={{ fontSize: '.8rem', color: 'var(--mid)', marginTop: '4px' }}>{c.note}</div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
