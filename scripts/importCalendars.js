const ical = require('node-ical');
const axios = require('axios');
const moment = require('moment');
const { Calendar, Booking } = require('../models');

async function importICal(calendar) {
  try {
    const response = await axios.get(calendar.url);
    const data = ical.parseICS(response.data);

    for (const event of Object.values(data)) {
      if (event.type === 'VEVENT') {
        const checkIn = moment(event.start).format('YYYY-MM-DD');
        const checkOut = moment(event.end).format('YYYY-MM-DD');

        const bookingExists = await Booking.findOne({
          where: {
            property_id: calendar.property_id,
            check_in: checkIn,
            check_out: checkOut
          }
        });

        if (!bookingExists) {
          await Booking.create({
            property_id: calendar.property_id,
            platform: 'airbnb',
            guest_name: event.summary || 'Client Airbnb',
            check_in: checkIn,
            check_out: checkOut,
            total_amount: 0
          });

          console.log(`✅ Ajouté : ${event.summary} (${checkIn} - ${checkOut})`);
        } else {
          console.log(`⚠️ Déjà existant : ${event.summary} (${checkIn} - ${checkOut})`);
        }
      }
    }
  } catch (error) {
    console.error('❌ Erreur importation iCal :', calendar.url, error.message);
  }
}

async function syncCalendars() {
  try {
    const calendars = await Calendar.findAll({ where: { source: 'airbnb' } });

    for (const calendar of calendars) {
      await importICal(calendar);
    }

    console.log('🚀 Tous les calendriers synchronisés avec succès !');
    process.exit();
  } catch (error) {
    console.error('❌ Erreur générale :', error.message);
  }
}

syncCalendars();
