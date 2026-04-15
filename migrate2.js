const xlsx = require('xlsx');
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://vkeluucysoqmqwogkubf.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZrZWx1dWN5c29xbXF3b2drdWJmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxODk4ODgsImV4cCI6MjA5MTc2NTg4OH0.3iEPyQNWgR-MQABU7VxPSvWch-irEwOC9pPodKcJsdY'
);

const workbook = xlsx.readFile('e:\\WebsiteProject(2026)\\Clinic_Management_System\\Assets\\Clinic Management System.xlsx', { cellDates: true });
const sheet = workbook.Sheets['Sheet1'];
const records = xlsx.utils.sheet_to_json(sheet, { raw: false });

async function migrate() {
    console.log(`Starting migration of ${records.length} records...`);
    let count = 0;

    for (let r of records) {
        if (!r['Appointment ID']) continue;

        let dateStr = r['Timestamp'];
        let created_at = new Date().toISOString();
        if (dateStr) {
            let parsed = new Date(dateStr);
            if (!isNaN(parsed)) created_at = parsed.toISOString();
        }

        const payload = {
            created_at: created_at,
            appointment_id: r['Appointment ID'],
            patient_id: r['Patient ID'] || null,
            name: r['Name'] || 'Unknown',
            age: String(r['Age'] || ''),
            gender: r['Gender'] || null,
            phone: String(r['Phone'] || ''),
            address: r['Address'] || null,
            symptoms: r['Symptoms'] || null,
            valid_till: r['Valid Till'] || null,
            visit_count: parseInt(r['Visit Count']) || 1,
            fee: parseFloat(r['Fee']) || 0,
            weight: r['Weight'] ? String(r['Weight']) : null
        };

        const { error } = await supabase.from('Varnika_database_CMS').insert([payload]);
        if (error) {
           console.error("Error inserting:", r['Appointment ID'], error.message);
        } else {
           count++;
        }
    }
    console.log(`Migration complete! Successfully inserted ${count} records.`);
}

migrate();
