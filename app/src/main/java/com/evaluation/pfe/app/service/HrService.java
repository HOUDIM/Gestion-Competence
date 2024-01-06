package com.evaluation.pfe.app.service;

import com.evaluation.pfe.app.dao.UserDao;
import com.evaluation.pfe.app.entities.User;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
@Slf4j
public class HrService implements IHrService{
    private final UserDao userDao;

    @Override
    public Set<User> retrieveAllHrs() {
        log.info("Find Hrs");
        return userDao.findUserByRoleHr();
    }
}
