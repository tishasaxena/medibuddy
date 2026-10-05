export const toList = (v) => {
  if (v == null) return [];
  const arr = Array.isArray(v) ? v : [v];
  return arr.map((x) => String(x).trim()).filter(Boolean);
};

export const first = (v) => toList(v)[0] || '';
export const joined = (v, sep = ', ') => toList(v).join(sep);

const LABELS = {
  brand_name: 'Brand name',
  generic_name: 'Generic name',
  manufacturer_name: 'Manufacturer',
  product_type: 'Product type',
  route: 'Route',
  substance_name: 'Active substance',
  application_number: 'Application number',
  product_ndc: 'Product NDC',
  package_ndc: 'Package NDC',
  spl_id: 'SPL ID',
  spl_set_id: 'SPL set ID',
  rxcui: 'RxCUI',
  unii: 'UNII',
  pharm_class_epc: 'Established class',
  pharm_class_moa: 'Mechanism of action',
  pharm_class_cs: 'Chemical structure class',
  pharm_class_pe: 'Physiologic effect',
  upc: 'UPC',
  nui: 'NUI',
};

export const labelFor = (key) =>
  LABELS[key] || key.replace(/_/g, ' ').replace(/^./, (c) => c.toUpperCase());

export const SECTIONS = [
  ['purpose', 'Purpose'],
  ['indications_and_usage', 'Indications and usage'],
  ['dosage_and_administration', 'Dosage and administration'],
  ['warnings', 'Warnings'],
  ['do_not_use', 'Do not use'],
  ['ask_doctor', 'Ask a doctor before use'],
  ['stop_use', 'Stop use and ask a doctor'],
  ['active_ingredient', 'Active ingredient'],
  ['inactive_ingredient', 'Inactive ingredients'],
  ['storage_and_handling', 'Storage and handling'],
];
