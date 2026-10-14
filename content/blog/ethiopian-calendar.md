---
title: 'Thirteen Months of Sunshine: How My Ethiopian Date Converter Works'
date: '2026-10-14T23:30:00+03:00'
description: 'How the Ethiopian calendar differs from the Gregorian one, and the day-counting math inside my Python package that converts between them.'
tags: ['python', 'ethiopia', 'calendars']
draft: true
---

As I write this, it is October 14, 2026 on most of the world's calendars. Here in Ethiopia it is also Tikimt 4, 2019.

That second date isn't a typo. Ethiopia runs on its own calendar, and almost every piece of software built here has to deal with it: payroll, billing cycles, government forms, school records. Most libraries only speak Gregorian, so sooner or later every Ethiopian developer ends up writing a converter. I wrote mine as a small Python package, [py-ethiopian-date-converter](https://github.com/GutemaG/py_ethiopain_date_converter), and this post walks through how it works.

<!-- TODO(Birhanu): one or two sentences on why you built it, e.g. which project needed it. -->

## How the Ethiopian calendar works

The rules are simpler than the Gregorian ones, which is part of what makes it fun to implement.

- **Thirteen months.** Twelve months of exactly 30 days, then a short thirteenth month, Pagume (ጳጉሜ), with 5 days, or 6 in a leap year. That's where the old tourism slogan "13 months of sunshine" comes from.
- **The year starts in September.** Enkutatash, the Ethiopian New Year, falls on September 11, or September 12 in the year before a Gregorian leap year.
- **It is 7 or 8 years "behind".** From September 11 to December 31 the Ethiopian year is 7 behind the Gregorian one; from January 1 to September 10 it is 8 behind.
- **A leap year every 4 years, no exceptions.** An Ethiopian year is a leap year when `year % 4 == 3`. There's no Gregorian-style "except centuries, unless divisible by 400" rule.

That last rule is why you can't convert with a fixed offset like "add 7 years and 8 months". The Gregorian calendar skips three leap days every 400 years and the Ethiopian one doesn't, so the two slowly drift apart. You need real arithmetic.

## The idea: count days, not dates

Mapping months of one calendar onto months of the other gets messy fast. The package avoids that entirely. It turns every date, in either calendar, into a single **day number**: how many days have passed since a fixed starting point. Converting then becomes three steps:

1. Turn the date into a day number in its own calendar.
2. Shift that number by a fixed offset so both calendars count from the same day.
3. Turn the shifted number back into a date in the other calendar.

That's exactly what the two public functions do:

```python
def to_ethiopian(date):
    if isinstance(date, str):
        date = datetime.fromisoformat(date)
    return create_ethiopian_date(get_day_no_gregorian(date) - 2431)


def to_gregorian(et_date):
    if isinstance(et_date, str):
        et_date = EthDate.from_dmy_format(et_date)
    return gregorian_date_from_day_no(get_day_no_ethiopian(et_date) + 2431)
```

Everything interesting lives in the four helpers, so let's go through them.

## Ethiopian date to day number

Because the Ethiopian calendar is so regular, this is one line:

```python
def get_day_no_ethiopian(et_date):
    num = et_date.year // 4
    num2 = et_date.year % 4
    return num * 1461 + num2 * 365 + (et_date.month - 1) * 30 + et_date.day - 1
```

`1461` is the length of one full four-year cycle: three normal years plus one leap year (365 × 4 + 1). So the function counts:

- `num * 1461`: days in all the complete four-year cycles before this year,
- `num2 * 365`: days in the earlier years of the current cycle. The leap year is always the last year of a cycle (`year % 4 == 3`), so none of these earlier years has a leap day and they're all exactly 365 days,
- `(month - 1) * 30`: days in the earlier months, since every month before Pagume has exactly 30 days,
- `day - 1`: days so far in this month.

No loops and no lookup tables. This is the part of the Ethiopian calendar I enjoy most.

## Day number back to an Ethiopian date

Going back is the same idea in reverse, with one subtle case:

```python
def create_ethiopian_date(day_num):
    num = day_num // 1461    # complete four-year cycles
    num2 = day_num % 1461    # day within the current cycle
    num3 = num2 // 365       # year within the cycle
    num4 = num2 % 365        # day within that year
    if num2 != 1460:
        return EthDate((num4 % 30) + 1, (num4 // 30) + 1, num * 4 + num3)
    else:
        return EthDate(6, 13, num * 4 + num3 - 1)
```

Dividing by 365 to find the year works for the first 1460 days of the cycle. But a cycle has 1461 days, and the very last one is the leap day: Pagume 6. For that single day, `num2 // 365` gives 4, which would roll over into the next year, so the function catches it explicitly and returns Pagume 6 of the leap year instead.

Once the year is known, 30-day months make the rest trivial, and Pagume falls out naturally as month 13.

## The Gregorian side

The Gregorian calendar is where the irregular rules live, and the helpers have to deal with them.

Counting days up to a Gregorian date uses the classic leap year formula:

```python
def get_day_no_gregorian(date):
    years = date.year - 1
    leap_years = years // 4 - years // 100 + years // 400
    non_leap_years = years - leap_years
    days_in_previous_years = leap_years * 366 + non_leap_years * 365
    days_in_current_year = add_gregorian_months(date.month, date.year) + date.day
    return days_in_previous_years + days_in_current_year
```

`years // 4 - years // 100 + years // 400` is the whole Gregorian leap year rule in one expression: every fourth year, minus century years, plus every fourth century.

Turning a day number back into a Gregorian date peels off the calendar's nested cycles from largest to smallest. Here is the core of `gregorian_date_from_day_no`:

```python
num400 = day_num // 146097          # 400-year cycles
day_num %= 146097
num100 = min(day_num // 36524, 3)   # 100-year cycles
day_num -= num100 * 36524
num4 = day_num // 1461              # 4-year cycles
day_num %= 1461
num1 = min(day_num // 365, 3)       # single years
day_num -= num1 * 365
```

The `min(..., 3)` calls are the Gregorian version of the Pagume 6 trick. A 400-year cycle holds four 100-year blocks, but the last one is a day longer because its final year (like 2000) *is* a leap year. Without the cap, the last day of that block would be counted as a fifth century. The same thing happens with the leap day at the end of a four-year block. The function also returns December 31 directly when the remainder lands exactly on a cycle boundary, then walks through the months of the final year to find the day.

## The magic number 2431

The last piece is the offset between the two day counts. Both counts start at zero, but from different days, so the gap between them is a constant. In this package that constant is `2431`.

Gregorian day 2431 is August 28 in the year 7, the day of Meskerem 1 in Ethiopian year 0. Every conversion in the package, in both directions, is just "count, shift by 2431, count back".

Here is the whole thing working on dates every Ethiopian knows:

```python
>>> to_ethiopian("2026-10-14")
EthDate(day=4, month=2, year=2019)    # Tikimt 4, 2019
>>> to_ethiopian("2023-09-12")
EthDate(day=1, month=1, year=2016)    # New Year on September 12, because 2024 is a Gregorian leap year
>>> to_ethiopian("2023-09-11")
EthDate(day=6, month=13, year=2015)   # Pagume 6: 2015 was an Ethiopian leap year
```

Because the core is just integer math, it's cheap to test exhaustively. Every day from 1900 to 2200 converts to the right Ethiopian date and back to the same Gregorian date.

## Making it pleasant to use

The math is the core, but the package wraps it in an `EthDate` class so application code doesn't have to think about day numbers:

```bash
pip install py-ethiopian-date-converter
```

```python
from ethiopian_date_converter.ethiopian_date_convertor import EthDate, to_gregorian

meskel = EthDate(17, 1, 2019)
meskel.formatted()           # 'መስከረም 17, 2019'
meskel.formatted("AO")       # 'Fulbaana 17, 2019'
meskel.day_of_week           # 'እሁድ' (Sunday)
meskel.to_gregorian()        # datetime(2026, 9, 27, 0, 0)

EthDate.now()                                # today's Ethiopian date
EthDate.from_dmy_format("27/01/1989")        # parse DD/MM/YYYY input
EthDate(1, 1, 2016) < EthDate(2, 1, 2016)    # True
```

A few details I'm happy with:

- **Adding days reuses the day number.** `add_days` converts the date to its day number, adds, and converts back, so month and year rollovers (including into Pagume) come for free.
- **Adding years handles Pagume 6.** Moving Pagume 6 of a leap year forward one year lands on Pagume 5, since the new year has no sixth day.
- **Comparisons work like you'd expect.** `EthDate` implements `<`, `<=`, `==` and friends, so you can sort Ethiopian dates directly.
- **Month names in two languages.** Amharic (`መስከረም`, `ጥቅምት`, ...) and Afaan Oromo (`Fulbaana`, `Onkololeessa`, ...), plus a hook for supplying your own.

## Takeaways

- If you work with two calendars, convert through a shared day count instead of mapping dates to each other directly.
- The Ethiopian calendar's regular structure (30-day months, a plain four-year leap cycle) makes it one of the easiest calendars to implement.
- Calendar bugs live on the edges: the leap day at the end of a cycle, the last day of a century. Handle them explicitly, and test by round-tripping lots of dates.

The package is open source on [GitHub](https://github.com/GutemaG/py_ethiopain_date_converter). If you build software for Ethiopian users and have your own calendar war stories, I'd love to hear them.
