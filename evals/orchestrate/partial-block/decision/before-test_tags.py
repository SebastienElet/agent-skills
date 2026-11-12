import unittest
from tags import normalize_tag

class TagTests(unittest.TestCase):
    def test_canonical_tag(self):
        self.assertEqual(normalize_tag("  New-SALE  "), "new-sale")
