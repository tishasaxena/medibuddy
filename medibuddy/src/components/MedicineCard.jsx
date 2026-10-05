import { memo } from 'react';
import { Link } from 'react-router-dom';
import { first, joined } from '../lib/format';

function MedicineCard({ item, from }) {
  const o = item.openfda || {};
  const brand = first(o.brand_name) || 'Unnamed product';

  const rows = [
    ['Generic', joined(o.generic_name)],
    ['Manufacturer', joined(o.manufacturer_name)],
    ['Route', joined(o.route)],
    ['Active substance', joined(o.substance_name)],
  ].filter(([, v]) => v);

  const type = first(o.product_type);

  return (
    <li>
      <Link
        to={`/medicine/${encodeURIComponent(item.id)}`}
        state={{ from }}
        className="card"
      >
        <div className="card-head">
          <h3>{brand}</h3>
          {type && <span className="badge">{type}</span>}
        </div>
        {rows.length > 0 ? (
          <dl>
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        ) : (
          <p className="muted">No further details listed.</p>
        )}
      </Link>
    </li>
  );
}

export default memo(MedicineCard);