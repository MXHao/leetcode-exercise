var ListNode = /** @class */ (function () {
    function ListNode(val, next) {
        this.val = (val === undefined ? 0 : val);
        this.next = (next === undefined ? null : next);
    }
    return ListNode;
}());
function isPalindrome(head) {
    if (!head)
        return true;
    var fast = head;
    var slow = head;
    var preNode = null;
    while (fast && fast.next) {
        // 快指针一次走两步
        fast = fast.next.next;
        // 反转前半部分链表
        var nextNode = slow.next;
        slow.next = preNode;
        preNode = slow;
        slow = nextNode;
    }
    // 当 fast 结点不为 null 时，表示输入链表结点数为奇数个，此时 slow 需要往后走一个结点再进行比较
    if (fast) {
        slow = slow.next;
    }
    // 剩余的链表与反转后的链表进行结点一一比较
    while (preNode && slow) {
        if (preNode.val !== slow.val) {
            return false;
        }
        preNode = preNode.next;
        slow = slow.next;
    }
    return true;
}
