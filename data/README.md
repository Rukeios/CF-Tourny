# Editable data

- `announcements.json`: homepage news cards.
- `schedule.json`: homepage next event and schedule rows.
- `standings.json`: season records and recent results.
- `stats.json`: season label and player statistics.
- `clips.json`: YouTube/TikTok highlights.
- `rules.json`: homepage `summary` bullets and full-page `sections`.
- `faq.json`: FAQ categories and answers.

Pages fetch these files at runtime. Direct `file://` opens use embedded fallbacks because browsers block fetch from local files.
