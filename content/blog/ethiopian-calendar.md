---
title: 'Thirteen Months of Sunshine: Converting Ethiopian Dates in Python'
date: '2026-10-14T23:30:00+03:00'
description: 'How the Ethiopian calendar differs from the Gregorian one, and the small piece of math that converts between them.'
tags: ['python', 'ethiopia', 'calendars']
draft: true
---

As I write this, it is October 14, 2026 on most of the world's calendars. Here in Ethiopia it is also Tikimt 4, 2019.

That second date isn't a typo. Ethiopia runs on its own calendar, and almost every piece of software built here has to deal with it: payroll, billing cycles, government forms, school records. Most libraries only speak Gregorian, so sooner or later every Ethiopian developer ends up writing a converter. This post is about how mine works.

## How the Ethiopian calendar works

The rules are simpler than the Gregorian ones, which is part of what makes it fun to implement.

- **Thirteen months.** Twelve months of exactly 30 days, then a short thirteenth month, Pagume, with 5 days (6 in a leap year). That's where the old tourism slogan "13 months of sunshine" comes from.
- **The year starts in September.** Enkutatash, the Ethiopian New Year, falls on September 11 in the Gregorian calendar, or September 12 in the year before a Gregorian leap year.
- **It is 7 or 8 years "behind".** The two calendars count years from different estimates of the same starting point. From September 11 to December 31 the Ethiopian year is 7 behind the Gregorian one; from January 1 to September 10 it is 8 behind.
- **A leap year every 4 years, no exceptions.** The Ethiopian leap year is any year where `year % 4 == 3`. There's no Gregorian-style "except centuries, unless divisible by 400" rule.

That last point matters. Because the Gregorian calendar skips three leap days every 400 years and the Ethiopian one doesn't, the two drift apart slowly. You can't convert with a fixed offset like "add 7 years and 8 months". You need actual arithmetic.

## The trick: count days, not dates

Converting month by month between two calendars gets messy fast. The cleaner approach is to translate both calendars into a single running day count and convert through that.

Astronomers already have one: the **Julian Day Number** (JDN), a count of days since a fixed point in 4713 BC. Every date in every calendar maps to exactly one JDN. So converting Gregorian to Ethiopian becomes two steps:

1. Gregorian date → JDN
2. JDN → Ethiopian date

Python's `date.toordinal()` already gives us a day count for Gregorian dates. It just starts from a different zero than JDN, so step one is a single addition.

## Ethiopian date to day number

With fixed 30-day months, turning an Ethiopian date into a day count is one line of arithmetic:

```python
ETHIOPIAN_EPOCH = 1724221  # Julian Day Number of Meskerem 1, year 1

def ethiopian_to_jdn(year, month, day):
    return (ETHIOPIAN_EPOCH - 1
            + 365 * (year - 1)   # days in all previous years
            + year // 4          # one leap day for every year with year % 4 == 3
            + 30 * (month - 1)   # days in previous months this year
            + day)
```

The `year // 4` is the neat part. Leap years are years 3, 7, 11 and so on, so the number of leap years *before* year `y` is exactly `y // 4`. No loops, no lookup tables.

## Day number back to an Ethiopian date

Going the other way, we find the year first, then peel off months and days:

```python
def jdn_to_ethiopian(jdn):
    year = (4 * (jdn - ETHIOPIAN_EPOCH) + 1463) // 1461
    month = (jdn - ethiopian_to_jdn(year, 1, 1)) // 30 + 1
    day = jdn - ethiopian_to_jdn(year, month, 1) + 1
    return year, month, day
```

The `1461` is the number of days in a four-year cycle (365 × 4 + 1). The `+ 1463` shifts the boundaries so the leap day lands at the end of year 3 of each cycle instead of year 4. Once we know the year, the 30-day months make the rest trivial, and Pagume falls out naturally as month 13.

## Putting it together

```python
from datetime import date

JDN_OFFSET = 1721425  # date.toordinal() + JDN_OFFSET == Julian Day Number

def gregorian_to_ethiopian(d: date):
    return jdn_to_ethiopian(d.toordinal() + JDN_OFFSET)

def ethiopian_to_gregorian(year, month, day):
    return date.fromordinal(ethiopian_to_jdn(year, month, day) - JDN_OFFSET)
```

A few checks against dates every Ethiopian knows:

```python
>>> gregorian_to_ethiopian(date(2026, 10, 14))
(2019, 2, 4)      # Tikimt 4, 2019
>>> gregorian_to_ethiopian(date(2023, 9, 12))
(2016, 1, 1)      # New Year on September 12, since 2024 is a Gregorian leap year
>>> gregorian_to_ethiopian(date(2023, 9, 11))
(2015, 13, 6)     # Pagume 6: 2015 was an Ethiopian leap year
>>> gregorian_to_ethiopian(date(2024, 1, 7))
(2016, 4, 28)     # Genna (Christmas), Tahsas 28 in the year after a leap year
```

I also round-tripped a couple hundred thousand random dates through both functions to make sure every date comes back unchanged. When the whole algorithm is three lines of integer math, that kind of brute-force test is cheap and catches off-by-one mistakes immediately. (I made one while writing this post. The test caught it.)

## From snippet to package

The math above is the core, but real applications need more than tuples of numbers. They need localized month names, formatting like "ጥቅምት 4, 2019", and validation so nobody can create Pagume 7.

That's what I wrapped up in [py_ethiopian_date_converter](https://github.com/GutemaG/py_ethiopain_date_converter), a small Python package for converting, formatting and localizing Ethiopian dates.

<!-- TODO(Birhanu): add a short usage example from the package here (install command + 3 to 5 lines), and a sentence on why you built it, e.g. which project needed it. -->

## Takeaways

- If you work with two calendars, convert through a shared day count instead of mapping dates to each other directly.
- The Ethiopian calendar's regular structure (30-day months, a plain 4-year leap cycle) makes it one of the easiest calendars to implement correctly.
- Test date code by round-tripping lots of dates. Calendars are full of edges, and the bugs live on them.

If you build software for Ethiopian users and have run into calendar headaches of your own, I'd love to hear about them.
