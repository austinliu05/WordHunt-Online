import pytest
from trie import Trie, TrieNode

# Initialize the test fixture for the Trie instance
@pytest.fixture
def trie():
    t = Trie()
    words = ["cat", "car", "cart", "dog", "dart"]
    for word in words:
        t.insert(word)
    return t

def test_insert_and_search(trie):
    assert trie.search("cat") is True
    assert trie.search("dog") is True
    
    assert trie.containsWord("rat") is False
    trie.insert("rate")
    assert trie.containsWord("rat") is True    